import { EventList } from "../../_components/event-list";
import { EventSheet } from "../../_components/event-sheet";
import { Navigation } from "../../_components/navigation";

const EventsPage = () => {

  return (
    <div className="flex flex-col items-start bg-[#2A3536] h-auto pb-10">
        <Navigation />
        <EventSheet />
        <EventList />
    </div>
  )

}

export default EventsPage;
