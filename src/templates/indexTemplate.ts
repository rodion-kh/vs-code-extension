export default function indexTemplate(componentName: string) {
  return `import ${componentName} from './${componentName}';
export default ${componentName};
`;
}
