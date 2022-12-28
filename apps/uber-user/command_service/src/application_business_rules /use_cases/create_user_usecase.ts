import { RequiredFiledsValidation } from '~/application_business_rules/validations/create_user_validations/required_fields_validation';
import { IUser, User } from '~~/shared/src/enterprise_business_rules/entities/user_entity';
import { event_factory } from '~~~/shared_kernal/core/event_factory';
import { CreateUserRequestData } from '~/application_business_rules/use_cases/create_user/create_user_request_data';
import { IEventStore } from '@uber/shared_kernal/ports/event_store';
import { IEvent } from '@uber/shared_kernal/ports/event';
import { IEventBus } from '@uber/shared_kernal/ports/event_bus_port';
import { UserPublishTopics } from '~~/shared/src/enterprise_business_rules/events/publish';

export interface ICreateUserUseCase {
    create: (userData: CreateUserRequestData) => Promise<void>
}

export class CreateUserUseCase implements ICreateUserUseCase {
    constructor (
        private validations: RequiredFiledsValidation,
        private event_store: IEventStore<IEvent<IUser>>,
        private event_bus: IEventBus<UserPublishTopics, {}>
    ) {}

    async create(data: CreateUserRequestData): Promise<void> {
        this.validations.validate(data); 
        const model = User.create_entity(data as IUser);
        const user_event = event_factory<IUser>(model.id!, 'user-created', model);
        await this.event_store.save_event(user_event);
        await this.event_bus.publish_event('user_created', model);
    }
}