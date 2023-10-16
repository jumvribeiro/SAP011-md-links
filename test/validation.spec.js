const chalk = require('chalk');
const {extractLinks, checkStatus, validatedList, checkStatusOfLinks} = require('../src/validation.js');

describe("extractLinks", () => {
  it("should extract all the links of a list", async () => {
    const path = "./files/another-teste.md";
    const listOfLinks = [
      {
        file: path,
        href: "https://www.youtube.com",
        text: "YouTube",
      },
      {
        file: path,
        href: "https://meusite.com.br",
        text: "Meu site",
      },
      {
        file: path,
        href: "https://www.facebook.com",
        text: "Facebook",
      },
      {
        file: path,
        href: "https://www.youtube.com",
        text: "YouTube",
      },
    ];
    const list = await extractLinks(path);
    expect(list).toEqual(listOfLinks);
  });

  it("should throw an error if the file does not exist", async () => {
    const nonExistentFilePath = "./test/non-existent-file.md";
    await expect(extractLinks(nonExistentFilePath)).rejects.toThrow(
      "ENOENT Não existe arquivo no diretório indicado"
    );
  });
});

describe("checkStatus", () => {
  it("should return an array with the status of each URL", async () => {
    const listOfURLs = [
      "https://www.google.com",
      "https://www.github.com",
      "https://www.nonexistentwebsite12345.com",
    ];

    const expectedStatus = [
      `${chalk.green("✅ OK")} | ${chalk.green(200)}`,
      `${chalk.green("✅ OK")} | ${chalk.green(200)}`,
      `${chalk.red("O link não foi encontrado")}`,
    ];

    const actualStatus = await checkStatus(listOfURLs);

    expect(actualStatus).toEqual(expectedStatus);
  });
});

describe('validatedList', () => {
  it('should return a list of valid and invalid links', async () => {
    const listOfLinks = [
      {
        text: 'Google',
        href: 'https://www.google.com'
      },
      {
        text: 'MDN Web Docs',
        href: 'https://developer.mozilla.org/pt-BR/'
      },
      {
        text: 'Teste de retorno 400',
        href: 'https://http.cat/[404]',
      }
    ];
  
    const expectedOutput = [
      {
        text: 'Google',
        href: 'https://www.google.com',
        status: expect.stringContaining('OK')
      },
      {
        text: 'MDN Web Docs',
        href: 'https://developer.mozilla.org/pt-BR/',
        status: expect.stringContaining('OK')
      },
      {
        text: 'Teste de retorno 400',
        href: 'https://http.cat/[404]',
        status: expect.stringContaining('FAIL')
      }
    ];
  
    const result = await validatedList(listOfLinks);
    expect(result).toEqual(expectedOutput);
  });
});

describe('checkStatusOfLinks', () => {
  it('should return a list with total, unique and broken links', async () => {
    const listOfLinks = [
      { href: 'https://www.youtube.com/', text: 'YouTube' },
      { href: 'https://meusite.com.br', text: 'Meu site' },
      { href: 'https://www.facebook.com/', text: 'Facebook' },
      { href: 'https://www.youtube.com/', text: 'YouTube' },
    ];
  
    const expectedResult = {
      totalLinks: 4,
      uniqueLinks: 3,
      brokenLinks: 1
    };
  
    const result = await checkStatusOfLinks(listOfLinks);
    expect(result).toEqual(expectedResult);
  });
});