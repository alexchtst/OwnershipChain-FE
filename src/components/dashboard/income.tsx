import React from "react"
import { Transaction } from "../../types/rwa"
import { LoaderComponent } from "../LoaderComponent";
import { backendService } from "../../services/backendService";

export function IncomeDashboard() {
    const [transaction, setTransaction] = React.useState<[Transaction[]] | []>([])
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        async function fetchData(){
            try {
                const res = await backendService.getIncome();
                setTransaction(res);
            } catch (error) {
                console.log(error)
            }finally {
                setIsLoading(false)
            }
        }
        fetchData();
    }, []);

    console.log(transaction);

    if(isLoading) return <LoaderComponent fullScreen={true} text="fetching asset..." />

    return (
        <div className="p-4 border border-gray-200 rounded-md bg-white">
            <h1 className="text-xl">IncomeDashboard</h1>
            <div>
                <div>Hallo world</div>
            </div>
        </div>
    )
}