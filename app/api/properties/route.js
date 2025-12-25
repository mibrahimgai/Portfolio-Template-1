import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

// This function GETS the properties from the Cloud to show on your site
export async function GET() {
    try {
        const client = await clientPromise;
        const db = client.db("realestate_db"); // This is the name of your database
        const properties = await db.collection("properties").find({}).toArray();
        // Map _id to id for frontend compatibility if needed, but usually frontend handles _id
        // Let's return as is, frontend seems to use .id, we might need to fix frontend or map here.
        // To be safe and consistent with previous frontend code which used .id, let's map it.
        const mappedProperties = properties.map(p => ({
            ...p,
            id: p._id.toString()
        }));
        return NextResponse.json(mappedProperties);
    } catch (e) {
        return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
    }
}

// This function SAVES a new property from your Admin Page to the Cloud
export async function POST(request) {
    try {
        const body = await request.json();
        const client = await clientPromise;
        const db = client.db("realestate_db");

        const result = await db.collection("properties").insertOne(body);

        return NextResponse.json({ message: "Property added!", id: result.insertedId });
    } catch (e) {
        return NextResponse.json({ error: "Failed to save" }, { status: 500 });
    }
}

// This function UPDATES a property (e.g. toggle featured)
export async function PUT(request) {
    try {
        const body = await request.json();
        const { _id, id, ...updateData } = body;
        const targetId = _id || id;

        if (!targetId) {
            return NextResponse.json({ error: "ID required" }, { status: 400 });
        }

        const client = await clientPromise;
        const db = client.db("realestate_db");

        await db.collection("properties").updateOne(
            { _id: new ObjectId(targetId) },
            { $set: updateData }
        );

        return NextResponse.json({ message: "Property updated" });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: "Failed to update" }, { status: 500 });
    }
}

// This function DELETES a property
export async function DELETE(request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: "ID required" }, { status: 400 });
        }

        const client = await clientPromise;
        const db = client.db("realestate_db");

        await db.collection("properties").deleteOne({ _id: new ObjectId(id) });

        return NextResponse.json({ message: "Property deleted" });
    } catch (e) {
        return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
    }
}
