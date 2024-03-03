import { redirect } from "next/navigation";
import getUser from "../../lib/get-user";
import trpc from "../../lib/trpc";
import VotingCenterBody from "./page-body";

export default async function VotingCenter() {
    const user = await getUser();
    if (!user) return redirect("/auth/login?redirect=/vote");
    if (!user.council) return redirect("/");

    const polls = await trpc.getActivePolls.query();

    return <VotingCenterBody polls={polls}></VotingCenterBody>;
}
