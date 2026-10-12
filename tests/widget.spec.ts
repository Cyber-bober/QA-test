import { test, expect } from '@playwright/test';
import { WidgetPage } from "./widget.page";

test.describe('Uchi.ru widget', () => {
    let widgetPage: WidgetPage;

    test.beforeEach(async ({ page }) => {
        widgetPage = new WidgetPage(page);
        await widgetPage.goto();
    });

    test('opens', async () => {
        await widgetPage.openWidget();
        await expect(widgetPage.getWidgetBody()).toBeVisible();
    });

    test('has correct title', async () => {
        await widgetPage.openWidget();

        const articles = widgetPage.getPopularArticles();
        await expect(articles.first()).toBeVisible({ timeout: 10000 });

        await articles.first().click();

        await expect(widgetPage.getPopularTitle()).not.toBeVisible({ timeout: 10000 });
    });

    test('telegram widget link is correct', async () => {
        await widgetPage.openWidget();

        const tg = widgetPage.getTelegramLink();
        await expect(tg).toBeVisible();
        await expect(tg).toHaveAttribute('href', /tlgg\.ru\/uchi_ru_bot/);
    });
});
