import { test, expect } from "@playwright/test";

test("implementar o contador de click", async ({ page }) => {
  // navegar até a home
  await page.goto("/");

  // localizar e instanciar o botão em uma variável
  const counterButton = page.getByRole("button", { name: "Count is 0" });

  // Verificar se o button está renderizado na tela
  await expect(counterButton).toBeVisible();

  // Clicar no botão
  await counterButton.click();

  // testar se o conteúdo do botão mudou de 0 para 1
  await expect(page.getByRole("button")).toContainText("Count is 1");
});

test("contador incrementa corretamente a cada clique (verifica valores intermediários)", async ({
  page,
}) => {
  await page.goto("/");

  const counterButton = page.getByRole("button");
  await expect(counterButton).toBeVisible();
  await expect(counterButton).toHaveText("Count is 0");

  for (let i = 1; i <= 5; i++) {
    await counterButton.click();
    await expect(counterButton).toHaveText(`Count is ${i}`);
  }
});

test("contador suporta muitos cliques consecutivos", async ({ page }) => {
  await page.goto("/");

  const counterButton = page.getByRole("button");
  await expect(counterButton).toBeVisible();

  const clicks = 10;
  for (let i = 0; i < clicks; i++) {
    await counterButton.click();
  }

  await expect(counterButton).toHaveText(`Count is ${clicks}`);
});
