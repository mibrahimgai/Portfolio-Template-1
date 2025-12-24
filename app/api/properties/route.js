import { promises as fs } from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const dataFilePath = path.join(process.cwd(), 'data', 'properties.json');

async function getProperties() {
    const data = await fs.readFile(dataFilePath, 'utf8');
    return JSON.parse(data);
}

async function saveProperties(properties) {
    await fs.writeFile(dataFilePath, JSON.stringify(properties, null, 2));
}

export async function GET() {
    try {
        const properties = await getProperties();
        return NextResponse.json(properties);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to load properties' }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const newProperty = await request.json();
        const properties = await getProperties();

        // Simple ID generation
        newProperty.id = Date.now().toString();

        properties.push(newProperty);
        await saveProperties(properties);

        return NextResponse.json(newProperty);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to add property' }, { status: 500 });
    }
}

export async function DELETE(request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

        let properties = await getProperties();
        properties = properties.filter(p => p.id !== id);

        await saveProperties(properties);

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete property' }, { status: 500 });
    }
}

export async function PUT(request) {
    try {
        const updatedProperty = await request.json();
        let properties = await getProperties();

        const index = properties.findIndex(p => p.id === updatedProperty.id);
        if (index === -1) return NextResponse.json({ error: 'Property not found' }, { status: 404 });

        properties[index] = updatedProperty;
        await saveProperties(properties);

        return NextResponse.json(updatedProperty);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update property' }, { status: 500 });
    }
}
