import Image from "next/image";

export function EmptyData() {

    return (
        <div className="flex flex-col justify-center items-center">
            <Image 
                src="/empty-data.png"
                alt="Empty data"
                width={160}
                height={160}
            />

            <p className="font-semibold text-5.5 ">Nada por aqui ainda...</p>
        </div>
    )
}