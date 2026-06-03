import {test,  expect } from "@playwright/test";
import { PlaygroundPage } from "../Pages/Playgroundpage";

test.beforeEach(async ({ page }) => {
  await page.goto("https://playground.tensorflow.org/");
  expect(page).toHaveTitle("A Neural Network Playground");
}
);
test("report test_loss", async ({ page }) => {
    const playgroundPage = new PlaygroundPage(page);
    console.log("Initial Test Loss");
    await playgroundPage.reportTestLoss();
    await playgroundPage.selectDataset("Exclusive or");
    await playgroundPage.setNoise(5);
    await playgroundPage.setFeatureState("xSquared", true);
    await playgroundPage.setFeatureState("ySquared", true);
    await playgroundPage.adjustNeurons(1, 'remove');
    await playgroundPage.adjustNeurons(2, 'remove');
    await playgroundPage.setLearningRate(0.1);
    await playgroundPage.simulationControl(0.3);
    console.log("Test Loss after simulation");
    await playgroundPage.reportTestLoss();
});

test.afterEach(async ({ page }) => {
    await page.close();
});
