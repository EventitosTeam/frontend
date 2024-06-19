import { EventList } from "../../_components/event-list";
import { Navigation } from "../../_components/navigation";

const EventsPage = () => {

  return (
    <div className="flex flex-col justify-center items-start">
        <Navigation />
        <EventList />
    </div>
  )

}

export default EventsPage;
