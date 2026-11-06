/**
 * A refusal the settings and data screens show to the admin as is.
 *   throw new SettingsError('Two records share kvk 12345678', { is_unique: '...' }, { duplicates });
 * Server actions turn it into fail(message, fieldErrors, { data: details }).
 */
export class SettingsError extends Error {
  constructor(
    message: string,
    public fieldErrors?: Record<string, string>,
    public details?: unknown,
  ) {
    super(message);
    this.name = 'SettingsError';
  }
}
