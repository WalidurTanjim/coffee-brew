import { getAllUsers } from "@/actions/server/auth";
import UsersManageList from "./UsersManageList";

export const revalidate = 0;

export default async function AdminUsersPage() {
     const usersRes = await getAllUsers();
     const users = usersRes?.users || [];

     return (
          <div className="space-y-6">
               <div>
                    <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                         User Accounts & Role Permissions
                    </h1>
                    <p className="text-sm text-slate-500">
                         View registered customer accounts, grant Admin role privileges, or delete inactive user accounts.
                    </p>
               </div>

               <UsersManageList initialUsers={users} />
          </div>
     );
}
