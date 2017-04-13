/**
 * Created by Atif on 12/20/2016.
 */

export class User {

    public email: string;
    public pwd: string;
    public tc: boolean;
    public countryCode: string;
    public ip: string;
    public city: string;
    public region: string;
    public areaCode: string;
    public dmaCode: string;
    public countryName: string;
    public longitude: string;
    public latitude: string;


    constructor() {
        this.email = "";
        this.pwd = "";
        this.countryCode = "";
        this.ip = "";
        this.city = "";
        this.region = "";
        this.areaCode = "";
        this.dmaCode = "";
        this.countryName = "";
        this.longitude = "";
        this.latitude = ""
    }
}