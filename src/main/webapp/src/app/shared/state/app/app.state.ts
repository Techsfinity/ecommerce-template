import { Selector, State, StateContext, Action } from '@ngxs/store';
import {ShowLoading} from "./app.action";

export class AppStateModel {
    loading?: boolean;
}

@State<AppStateModel>({
    name: 'app'
})
export class AppState {
    @Selector()
    static loading(state: AppStateModel) {
        return state.loading;
    } // loading

    @Action(ShowLoading)
    public showLoading({ patchState }: StateContext<AppStateModel>, action: ShowLoading) {
        patchState({ loading: action.payload });
    } // showLoading

} // class