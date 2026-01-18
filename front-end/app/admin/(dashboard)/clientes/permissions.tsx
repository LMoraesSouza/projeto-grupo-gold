import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useUserStore } from "@/stores/userStore";
import { Permission } from "@/types/entities";


type ActionsProps = {
    userId: number;
    permissions?: Permission[];
}

export function Permissions ({
    userId,
    permissions, 
}: ActionsProps) {
    const appointmentsPermission = permissions?.find(p => p.access === 'APPOINTMENTS')
    const logsPermission = permissions?.find(p => p.access === 'LOGS')

       const { 
            updateUserPermissions,
        } = useUserStore();

    function handleClickAppointments() {
        const permissionRequest = {
            access: appointmentsPermission?.access.toLowerCase() || 'appointments',
            isActive: appointmentsPermission? !appointmentsPermission?.isActive : false,
            userId: userId,
        }
        
        updateUserPermissions(permissionRequest, appointmentsPermission?.id)
    }
    function handleClickLogs() {
        const permissionRequest = {
            access: logsPermission?.access.toLowerCase() || 'logs',
            isActive: logsPermission? !logsPermission?.isActive : false,
            userId: userId,
        }
        updateUserPermissions(permissionRequest, logsPermission?.id)
    }

    const colors: {[key: string]: string} = {
        'true': 'bg-black text-white ',
        'false': 'bg-white text-black border-black border hover:bg-gray-100'
    }

    const appointmentsButtonColor = colors[String(appointmentsPermission?.isActive) || 'true']
    const logsButtonColor = colors[String(logsPermission?.isActive) || 'true']

    return (
        <div className="space-x-2.5">
            <Button 
                className={cn('rounded-full px-3.75 py-1.25 font-normal leading-[150%] font-3 max-h-7', appointmentsButtonColor)}
                onClick={handleClickAppointments}>
                Agendamentos
            </Button>

            <Button 
                className={cn('rounded-full px-3.75 py-1.25 leading-[150%] font-3 max-h-7', logsButtonColor)}
                onClick={handleClickLogs}>
                Logs
            </Button>
           
        </div>
        
    )

}