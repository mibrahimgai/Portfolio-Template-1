export const dynamic = 'force-static';
import { promises as fs } from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

const dataFilePath = path.join(process.cwd(), 'data', 'communities.json');

async function getCommunities() {
    const data = await fs.readFile(dataFilePath, 'utf8');
    return JSON.parse(data);
}

async function saveCommunities(communities) {
    await fs.writeFile(dataFilePath, JSON.stringify(communities, null, 2));
}

export async function GET() {
    try {
        const communities = await getCommunities();
        return NextResponse.json(communities);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to load communities' }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const newCommunity = await request.json();
        const communities = await getCommunities();

        newCommunity.id = Date.now().toString();

        communities.push(newCommunity);
        await saveCommunities(communities);

        return NextResponse.json(newCommunity);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to add community' }, { status: 500 });
    }
}

export async function DELETE(request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

        let communities = await getCommunities();
        communities = communities.filter(c => c.id !== id);

        await saveCommunities(communities);

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete community' }, { status: 500 });
    }
}
