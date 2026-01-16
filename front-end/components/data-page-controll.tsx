import { RiArrowLeftSLine, RiArrowRightSLine } from "@remixicon/react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

type props = {
    canGoNext: boolean;
    canGoPrevious: boolean;
    nextPage: () => void;
    previousPage: () => void;
    page: number;
}

export function DataPageControl({
    canGoNext,
    canGoPrevious,
    nextPage,
    previousPage,
    page,
}: props) {

    return (
        <div className="flex justify-center items-center gap-1.75 mt-6.25">
            <Button
                onClick={previousPage}
                disabled={!canGoPrevious}
                className="size-4.5"
            >
               < RiArrowLeftSLine size={8} /> 
            </Button>

            <Badge className="text-white bg-black leading-5.5 px-2.5 rounded-md size-6.25">
                {(page+1)}
            </Badge>

            <Button
                onClick={nextPage}
                disabled={!canGoNext}
                className="size-4.5"
            >
               < RiArrowRightSLine size={8} /> 
            </Button>
        </div>
    )
}