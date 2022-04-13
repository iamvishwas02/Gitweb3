const puppeteer = require('puppeteer');
const dappeteer = require('@chainsafe/dappeteer');


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {

  const browser = await dappeteer.launch(puppeteer, {
    metamaskVersion: 'v10.8.1',
    headless: false,
    slowMO: 1000 ,
    defaultViewport: null
  });

  
  const metaMask = await dappeteer.setupMetamask(browser, { seed: 'thought rocket flight draft fold leave syrup tide three present damage rabbit' });
  
  await dappeteer.getMetamaskWindow(browser);
  await metaMask.addNetwork(
    {
      networkName: "BSC Testnet",
      rpc: "https://data-seed-prebsc-1-s1.binance.org:8545",
      chainId: 97,
      symbol: "BNB",

    });

  await metaMask.switchNetwork('BSC Testnet');

  await metaMask.addToken('0x5833AE3278eCb638F0b9E3C9324619BA9Ce8C870' );

  const page = await browser.newPage();

  await page.goto("https://staking-bithotel-2u9ie7nmc-decubate.vercel.app/");
  
  const connectWallet = await page.$x('//p[@class="text-sm cursor-pointe"]');
  await connectWallet[0].click();
  await page.waitForTimeout(4000)
  const walletType = await page.$$('div[class="mt-4"]');
  await walletType[0].click();
  //await page.waitForTimeout(4000)
  await metaMask.approve( {allAccounts: true});
 // await page.bringToFront();
  //await metaMask.confirmTransaction();

}
main()