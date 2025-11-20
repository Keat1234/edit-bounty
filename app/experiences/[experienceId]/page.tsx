import { headers } from "next/headers";
import { whopsdk } from "@/lib/whop-sdk";
import { getJobs } from "@/lib/store";
import ClientDashboard from "@/components/ClientDashboard";

export default async function ExperiencePage({
	params,
	searchParams,
}: {
	params: Promise<{ experienceId: string }>;
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
	const { experienceId } = await params;
	const search = await searchParams;
	
	// Get the dev token from query params if present (for local dev without proxy)
	const devToken = search['whop-dev-user-token'] as string | undefined;
	
	// Create headers with the dev token if available
	const headersList = await headers();
	const headersWithToken = new Headers(headersList);
	if (devToken) {
		headersWithToken.set('x-whop-user-token', devToken);
	}
	
	// Ensure the user is logged in on whop.
	let userId = 'user_mock';
	let user: { name: string | null; username: string } = { name: 'Demo User', username: 'demo' };

	try {
		const auth = await whopsdk.verifyUserToken(headersWithToken);
		userId = auth.userId;
		user = await whopsdk.users.retrieve(userId);
	} catch (e) {
		console.log('Auth failed or running in demo mode:', e);
		// Fallback to mock user for demo/testing
	}

	// Get the role from search params, default to 'editor'
	const role = (search['role'] as string) || 'editor';
	
	// Get all jobs for display
	const allJobs = getJobs();
	const openJobs = allJobs.filter(j => j.status === 'OPEN');
	const myCreatorJobs = allJobs.filter(j => j.creatorId === 'creator-1');
	const myEditorJobs = allJobs.filter(j => j.editorId === 'editor-1');
	const completedJobs = allJobs.filter(j => j.status === 'APPROVED');

	const displayName = user.name || `@${user.username}`;

	return (
		<ClientDashboard
			displayName={displayName}
			role={role}
			devToken={devToken}
			allJobs={allJobs}
			openJobs={openJobs}
			myCreatorJobs={myCreatorJobs}
			myEditorJobs={myEditorJobs}
			completedJobs={completedJobs}
		/>
	);
}
