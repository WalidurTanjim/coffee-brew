import authOptions from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
     const session = await getServerSession(authOptions);

     if (!session) {
          redirect("/auth/signin");
     }

     if (session?.user?.role === "admin") {
          redirect("/dashboard/admin");
     } else {
          redirect("/dashboard/user");
     }
}
