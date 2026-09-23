/**
 * Configuração do AWS Cognito.
 *
 * ⚠️ VALORES FAKE — placeholders até a conta real do Cognito ser criada.
 * Quando o User Pool e o App Client existirem, troque os valores abaixo
 * (idealmente via variáveis de ambiente injetadas no build/deploy) pelos
 * reais, e troque a implementação de `src/lib/auth.ts` para usar o SDK
 * do Amplify/Cognito de fato, mantendo a mesma interface `AuthClient`.
 */
export const cognitoConfig = {
  region: "us-east-1",
  userPoolId: "us-east-1_FAKEPOOL1",
  userPoolClientId: "fakeclientid00000000000000",
  domain: "aventura-organizada-fake.auth.us-east-1.amazoncognito.com",
};
