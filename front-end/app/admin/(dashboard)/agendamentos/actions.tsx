import { Button } from "@/components/ui/button"
import { RiCheckLine, RiCloseLargeLine } from "@remixicon/react"

type ActionsProps = {
    id: number
    status: string
}

export function Actions ({
    id, 
    status
}: ActionsProps) {

    function handleClickCancel() {
        console.log(id)
    }

    function handleClickConfirm() {
        console.log(id)
    }

    return (
        <div className="space-x-2.5">
           {
                status !== "Cancelado" &&
                <Button 
                    className="rounded-full color size-7.5"
                    onClick={handleClickCancel} 
                >
                    <RiCloseLargeLine size={12}/>  
                </Button>
           } 
           {
                status === "Em análise" && 
            
                <Button 
                    onClick={handleClickConfirm} 
                    className="rounded-full color size-7.5 p-0"
                >
                    <RiCheckLine size={22}/>  
                </Button>
           }
        </div>
        
    )

}