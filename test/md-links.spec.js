const chalk = require('chalk');
const {isFile, isDirectory, mdLinks} = require('../src/index.js');

describe('isFile', () => {
  it('should be a function', () => {
    expect(typeof isFile).toBe('function');
  });

  it('isFile returns true for a valid file path', () => {
    const filePath = './files/teste.md';
    expect(isFile(filePath)).toBe(true);
  });
});

describe('isDirectory', () => {
  it('should be a function', () => {
    expect(typeof isDirectory).toBe('function');
  });

  it('isDirectory returns true for a valid directory path', () => {
    const directoryPath = './files/';
    expect(isDirectory(directoryPath)).toBe(true);
  });
});

describe('mdLinks', () => {
  it('should throw an error if file or directory does not exist', () => {
    expect(() => mdLinks('dont-exist.md')).toThrowError('Arquivo ou diretório não existe');
  });

  it('should throw an error if file or directory is not md', () => {
    expect(() => mdLinks('./files/teste.html')).toThrowError('Extensão inválida');
  });

  it('should return a list of links', () => {
    expect.assertions(1);
    return mdLinks('./files/another-teste.md', {}).then(result => {
      expect(result).toEqual([
        {
          href: 'https://www.youtube.com',
          text: 'YouTube',
          file: './files/another-teste.md'
        },
        {
          href: 'https://meusite.com.br',
          text: 'Meu site',
          file: './files/another-teste.md'
        },
        {
          href: 'https://www.facebook.com',
          text: 'Facebook',
          file: './files/another-teste.md'
        },
        {
          href: 'https://www.youtube.com',
          text: 'YouTube',
          file: './files/another-teste.md'
        }
      ]);
    });
  });
  
  it('should validate links and return stats if --validate and --stats option are being used', async () => {
    const options = { validate: true, stats: true };
    const result = await mdLinks('./files/teste.md', options);
    expect(result).toHaveProperty('totalLinks', 7);
    expect(result).toHaveProperty('uniqueLinks', 7);
    expect(result).toHaveProperty('brokenLinks', 2);
  });
 
  it('should return stats if --stats option is being used', async () => {
    const options = { stats: true };
    const result = await mdLinks('./files/teste.md', options);
    expect(result).toHaveProperty('totalLinks', 7);
    expect(result).toHaveProperty('uniqueLinks', 7);
  });

  it('should return validated links if --validate option is being used', async () => {
    const options = { validate: true };
    const result = await mdLinks('./files/teste.md', options);
    expect(result).toEqual([
      {
        href: 'https://developer.mozilla.org/pt-BR/docs/Web/API/FileList',
        text: 'FileList',
        file: './files/teste.md',
        status: `${chalk.green("✅ OK")} | ${chalk.green(200)}`
      },
      {
        href: 'https://developer.mozilla.org/pt-BR/docs/Web/HTML/Element/Input',
        text: '<input>',
        file: './files/teste.md',
        status: `${chalk.green("✅ OK")} | ${chalk.green(200)}`
      },
      {
        href: 'https://developer.mozilla.org/pt-BR/docs/Web/API/DataTransfer',
        text: 'DataTransfer',
        file: './files/teste.md',
        status: `${chalk.green("✅ OK")} | ${chalk.green(200)}`
      },
      {
        href: 'https://developer.mozilla.org/pt-BR/docs/Web/API/HTMLCanvasElement',
        text: 'HTMLCanvasElement',
        file: './files/teste.md',
        status: `${chalk.green("✅ OK")} | ${chalk.green(200)}`
      },
      {
        href: 'https://http.cat/[404]',
        text: 'Teste de retorno 400',
        file: './files/teste.md',
        status: `${chalk.red("❌ FAIL")} | ${chalk.red(404)}`
      },
      {
        href: 'https://developer.mozilla.org/pt-BR/docs/Web/API/File#implementation_notes',
        text: 'Implementation notes',
        file: './files/teste.md',
        status: `${chalk.green("✅ OK")} | ${chalk.green(200)}`
      },
      {
        href: 'http://gatinhosalsicha.com.br/',
        text: 'gatinho salsicha',
        file: './files/teste.md',
        status: `${chalk.red("O link não foi encontrado")}`
      },
      ]);
  });

  it('should return an array of promises when given a directory', () => {
    const path = './files';
    const options = { validate: true, stats: false };
    return mdLinks(path, options).then((result) => {
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBe(4); //qntd de arquivos dentro da pasta
      expect(result[0]).toBeInstanceOf(Array);
    });
  });
});