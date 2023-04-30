import { makeAutoObservable, runInAction } from "mobx";
import { Activity } from "../models/Activity";
import agent from "../api/agent";
import { v4 as uuid } from 'uuid'

export default class ActivityStore {
    
    activityRegistry = new Map<string,Activity>();
    selectedActivity: Activity | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;
    submitting = false;

    constructor() {
        makeAutoObservable(this)
    }
    get activitiesByDate(){
        return Array.from(this.activityRegistry.values()).sort((a,b)=> Date.parse(a.date)-Date.parse(b.date));
    }

    loadActivities = async () => {
        this.setLoadingInitial(true);
        try {

            const activities = await agent.Activities.list();
            activities.forEach(x => {
                x.date = x.date.split('T')[0];
                this.activityRegistry.set(x.id,x);
            });
            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }

    }

    //This action method we needs it to follow MOBX requirements for asyn/await 
    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    selectActivity = (id: string) => {
        this.selectedActivity = this.activityRegistry.get(id);
    }

    cancelActivity = () => {
        this.selectedActivity = undefined;
    }

    openForm = (id?: string) => {
        id ? this.selectActivity(id) : this.cancelActivity();
        this.editMode = true;
    }

    closeForm = () => {
        this.editMode = false;
    }

    createOrEdit = async (activ: Activity) => {
        this.setSubmitting(true);
        this.loading = true;
        try {
            if (activ.id) {
                await agent.Activities.update(activ);
                runInAction(() => {
                    // this.activities = [...this.activities.filter(x => x.id !== activ.id), activ];
                    this.activityRegistry.set(activ.id,activ);
                    this.editMode = false;
                    this.selectedActivity = activ;
                    this.setSubmitting(false);
                    this.loading = false;
                })

            } else {
                activ.id = uuid();
                await agent.Activities.create(activ);
                runInAction(() => {
                    // this.activities = [...this.activities, activ];
                    this.activityRegistry.set(activ.id,activ);
                    this.editMode = false;
                    this.selectedActivity = activ;
                    this.setSubmitting(false);
                    this.loading = false;
                })
            }
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
                this.setSubmitting(false);
            });
        }
    }

    setSubmitting = (state: boolean) => {
        this.submitting = state;
    }

    deleteActivity = async (id: string) => {
        this.setSubmitting(true);
        try {
            await agent.Activities.delete(id);
            runInAction(() => {
                // this.activities = [...this.activities.filter(x => x.id !== id)];
                this.activityRegistry.delete(id);
                if (this.selectedActivity?.id===id) this.cancelActivity();
                this.setSubmitting(false);
            })
        } catch (error) {
                console.log(error);
                runInAction(()=>{
                    this.setSubmitting(true);
                })
        }
    }
}