import { Switch } from "@/components/ui/switch";
import { useUserStore } from "@/stores/userStore";


type ActionsProps = {
    id: number
    status: boolean
}

export function Actions ({
    id, 
    status
}: ActionsProps) {

       const { 
            updateUser,
        } = useUserStore();

    function handleClick() {
        updateUser(id, {isActive: !status})
    }

    return (
        <div className="space-x-2.5">
           <Switch 
                checked={status}    
                onClick={handleClick}
           />
        </div>
        
    )

}