export class InventoryPage{
    constructor(page){
        this.page = page;
    }

    async getItemCount(){
        const items = await this.page.locator('[data-test= "inventory_item"]');
        const count = await items.count();
        console.log(count);
    }

    async addItemToCart(index){
        await this.page.locator('[data-test= "add-to-cart-sauce-labs-backpack"]').nth(index).click();
    }

    async getCartBadge(){
        const badge = this.page.locator('[data-test="shopping-cart-badge"]');
        return badge;
    }
}