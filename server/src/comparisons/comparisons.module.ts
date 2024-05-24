import {Module} from "@nestjs/common";
import {ComparisonsService} from "./comparisons.service";
import {ComparisonsController} from "./comparisons.controller";
import {UsersModule} from "src/users/users.module";
import {RepositoriesModule} from "src/repositories/repositories.module";

@Module({
    imports: [UsersModule, RepositoriesModule,],
    controllers: [ComparisonsController,],
    providers: [ComparisonsService,],
})
export class ComparisonsModule {}
