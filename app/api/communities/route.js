import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const client = await clientPromise;
        const db = client.db("realestate_db");
        const communities = await db.collection("communities").find({}).toArray();

        const mappedCommunities = communities.map(c => ({
            ...c,
            id: c._id.toString()
        }));

        return NextResponse.json(mappedCommunities);
    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: "Failed to fetch communities" }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const body = await request.json();

        // Remove id if it was sent by client (we rely on MongoDB _id)
        const { id, ...communityData } = body;

        const client = await clientPromise;
        const db = client.db("realestate_db");

        const result = await db.collection("communities").insertOne(communityData);

        return NextResponse.json({
            ...communityData,
            id: result.insertedId.toString()
        });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: "Failed to add community" }, { status: 500 });
    }
}

export async function DELETE(request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: "ID required" }, { status: 400 });
        }

        const client = await clientPromise;
        const db = client.db("realestate_db");

        await db.collection("communities").deleteOne({ _id: new ObjectId(id) });

        return NextResponse.json({ success: true });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: "Failed to delete community" }, { status: 500 });
    }
}
