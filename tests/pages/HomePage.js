export class HomePage{
    constructor(page){
        this.page = page; //gives access to the playwright page object. allows class methods to interact with the browser. like giving the class a remote control for the browser.
    }

    async navigate(){
        await this.page.goto('https://www.saucedemo.com/');
    }

} 