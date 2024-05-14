import dashify from 'dashify';

export default function cssTemplate(componentName: string) {
  return `.${dashify(componentName)} {

    }
    `;
}
