import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { TransitionStatusDto } from './dto/transition-status.dto';
export declare class EventsController {
    private readonly eventsService;
    constructor(eventsService: EventsService);
    create(createEventDto: CreateEventDto, req: any): Promise<import("@shared/types/event.types").IEvent>;
    findAll(req: any): Promise<import("@shared/types/event.types").IEvent[]>;
    findOne(id: string, req: any): Promise<import("@shared/types/event.types").IEventWithDetails>;
    getOverview(id: string, req: any): Promise<import("@shared/types/event.types").IEventOverview>;
    update(id: string, updateEventDto: UpdateEventDto, req: any): Promise<import("@shared/types/event.types").IEvent>;
    transitionStatus(id: string, transitionStatusDto: TransitionStatusDto, req: any): Promise<import("@shared/types/event.types").IEvent>;
    remove(id: string, req: any): Promise<void>;
}
