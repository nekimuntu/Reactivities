import { makeObservable, observable } from "mobx";

export default class CabinStore{
    name='Costa Chica';

    constructor(){
        makeObservable(this,{
            name:observable
        })
    }
}