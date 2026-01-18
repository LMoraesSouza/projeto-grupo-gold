import { Button } from "@/components/ui/button"
import { useAppointmentStore } from "@/stores/appointmentsStore"
import { RiCloseLargeLine } from "@remixicon/react"

type ActionsProps = {
    id: number
    status: string
}

export function Actions ({
    id, 
    status
}: ActionsProps) {

       const { 
            updateAppointment,
            getMyAppointments
        } = useAppointmentStore();

    function handleClickCancel() {
        updateAppointment(id, {status: "canceled"})
        getMyAppointments()
    }

    // function handleClickConfirm() {
    //     updateAppointment(id, {status: "scheduled"})
    //     getMyAppointments()
    // }

    return (
        <div className="space-x-2.5">
           {
                status !== "CANCELED" &&
                <Button 
                    className="rounded-full color size-7.5"
                    onClick={handleClickCancel} 
                >
                    <RiCloseLargeLine size={12}/>  
                </Button>
           } 
           {/* {
                status === "PENDING" && 
            
                <Button 
                    onClick={handleClickConfirm} 
                    className="rounded-full color size-7.5 p-0"
                >
                    <RiCheckLine size={22}/>  
                </Button>
           } */}
        </div>
        
    )

}