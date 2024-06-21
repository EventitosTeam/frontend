import { Navigation } from "../../_components/navigation";
import { SearchEvent } from "../../_components/search-event";


const SearchPage = () => {

    return (
        <div className="flex flex-col items-start bg-[#2A3536] h-full pb-10">
            <Navigation />
            <div className="flex justify-center items-center w-full">
                <SearchEvent />     
            </div>
        </div>
    );
}

export default SearchPage;