import { Page, Locator } from "@playwright/test";

enum WidgetPageSelectors {
    WRAPPER = '.sc-dino-typography-h > [class^=widget__]',
    WIDGET_BODY = '[class^=widgetWrapper] > [class^=widget__]',
    HEADER_TEXT = 'header h5',
    BUTTON_OPEN = '[data-test=openWidget]',
    ARTICLE_POPULAR_TITLE = '[class^=popularTitle__]',
    ARTICLE_POPULAR_LIST = '[class^=popularTitle__] + ul',
    ARTICLE_POPULAR_LIST_ITEM = 'li',
    TELEGRAM_LINK = 'a[href*="tlgg.ru/uchi_ru_bot"]',
    COOKIE_BUTTON = '._UCHI_COOKIE__button',
}

export class WidgetPage {
    readonly page: Page;
    readonly body: Locator;

    constructor(page: Page) {
        this.page = page;
        this.body = page.locator(WidgetPageSelectors.WIDGET_BODY);
    }

    async goto() {
        await this.page.goto('/');
        const cookie = this.page.locator(WidgetPageSelectors.COOKIE_BUTTON).first();
        if (await cookie.count()) {
            await cookie.click().catch(() => {});
        }
    }

    async openWidget() {
        await this.page.locator(WidgetPageSelectors.BUTTON_OPEN).click();
        await this.body.waitFor({ state: 'visible' });
    }

    getWidgetBody(): Locator {
        return this.body;
    }

    getPopularArticles(): Locator {
        return this.body
            .locator(WidgetPageSelectors.ARTICLE_POPULAR_LIST)
            .locator(`> ${WidgetPageSelectors.ARTICLE_POPULAR_LIST_ITEM}`);
    }

    getPopularTitle(): Locator {
        return this.body.locator(WidgetPageSelectors.ARTICLE_POPULAR_TITLE);
    }

    getHeaderText(): Locator {
        return this.body.locator(WidgetPageSelectors.HEADER_TEXT);
    }

    getTelegramLink(): Locator {
        return this.page.locator(WidgetPageSelectors.TELEGRAM_LINK).first();
    }
}
