import {Locator, Page, expect} from "@playwright/test";

export class PlaygroundPage {
    readonly page: Page;
    
    private metricsSection: Locator;

    constructor(page: Page) {
        this.page = page;
        this.metricsSection = this.page.locator(".metrics");
    }   
    async reportTestLoss() {
        const lossTest = await this.page.locator("div[id='loss-test']").textContent();
        console.log(`Test Loss: ${lossTest}`);
    }   
    async selectDataset(datasetName: 'Circle' | 'Exclusive or' | 'Gaussian' | 'Spiral') {
        const targetDataset =  this.page.getByTitle(datasetName);
        await targetDataset.locator('canvas').click();
    }
    async setNoise(noiseLevel: number) {
        const noiseSlider = this.page.getByRole('slider', { name: 'Noise:' });
        await noiseSlider.fill(noiseLevel.toString());   
    }
    async setLearningRate(learningRate: number) {
        const learningRateSelect = this.page.locator('#learningRate');
        await learningRateSelect.selectOption(learningRate.toString());
    }
    async adjustNeurons(layer: number, action: 'add' | 'remove') {
        
        const layers = this.page.locator('div[class^="ui-numNodes"]');
        if (layer <= 0 || layer > await layers.count()) {
            throw new Error(`Layer index ${layer} is out of bounds.`);
        }
        const specificlayer = this.page.locator(`div[class^="ui-numNodes${layer}"]`);
        await specificlayer.getByRole('button', { name: action }).click();
    }
    async simulationControl(seconds: number)
    {   const simulationButton = this.page.getByTitle('Run/Pause');
        await simulationButton.click(); // Start the simulation
        
        await expect.poll(async () => {
            const iterText = await this.page.locator('#iter-number').textContent();
            return iterText ? parseInt(iterText.replace(/,/g, '').trim(), 10) : null;
        }, { timeout: 15000, intervals: [5000] }).toBeGreaterThanOrEqual(seconds * 1000);
        
        await simulationButton.click(); // Pause the simulation
    }
    async setFeatureState(feature: string, state: boolean) {       
        const featureContainer = this.page.locator(`#canvas-${feature}`);    
        const className = await featureContainer.getAttribute('class');
        const isCurrentlySelected = className? !className.includes('inactive'):false;
        
        if (isCurrentlySelected !== state)         
            await featureContainer.locator('div > canvas').click();          
    }
    

}