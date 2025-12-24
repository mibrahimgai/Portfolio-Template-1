import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

// This function GETS the properties from the Cloud to show on your site
export async function GET() {
    try {
        const client = await clientPromise;
        const db = client.db("realestate_db"); // This is the name of your database
        const properties = await db.collection("properties").find({}).toArray();
        return NextResponse.json(properties);
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
