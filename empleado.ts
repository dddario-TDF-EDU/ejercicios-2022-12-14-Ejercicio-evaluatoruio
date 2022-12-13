//se podria haber creado la clase persona y heredar de esta.

export class Empleado {
    
    private id: number;
    private name: string;
    private city: string;
    private birthday: string;
    private email: string;
    private imgID: string;

    public constructor(pID: number, pName: string, pCity: string, pBirthday: string, pEmail: string, pImgID?: string) {
        this.id = pID;
        this.name = pName;
        this.city = pCity;
        this.birthday = pBirthday;
        this.email = pEmail;
        if(pImgID == undefined) {
            this.imgID = "";
        } else {
            this.imgID = pImgID;
        }
    }

    public getName(): string {
        return this.name;
    }

    public setName(newName: string): void {
        this.name = newName;
    }

    public getID(): number {
        return this.id;
    }

    public setID(newID: number): void {
        this.id = newID;
    } 

    public getBirthday(): string {
        return this.birthday;
    }

    public setBirthday(newDate: string): void {
        this.birthday = newDate;
    }

    public getEmail(): string {
        return this.email;
    }

    public setEmail(newEmail: string): void {
        this.email = newEmail;
    }

    public getCity(): string {
        return this.city;
    }

    public setCity(newCity: string) {
        this.city = newCity;
    }

    public getImg(): string {
        return this.imgID;
    }

    public setImg(newURL: string): void {
        this.imgID = newURL;
    }


}