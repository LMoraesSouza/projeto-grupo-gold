import { Button } from "@/components/ui/button";


type Props = {
    label: string
    children?: React.ReactNode
    onClick?: () => void   
}

export function DataGridHeaderButton({
    label,
    children,
    onClick,
}: Props) {
    
    return (
        <Button
            className="flex flex-1 justify-start p-0"
            variant="ghost"
            onClick={onClick}
        >
            
            {label}
            {children}
        </Button>
    )
}