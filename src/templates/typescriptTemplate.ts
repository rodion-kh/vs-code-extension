import dashify from 'dashify';

export default function typescriptTemplate(componentName: string) {
  return `import styles from './${componentName}.module.css';
  
export default function ${componentName}() {
  return <div class={styles['${dashify(componentName)}']}></div>;
}
`;
}
