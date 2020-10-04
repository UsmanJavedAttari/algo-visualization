export class AlgoOptionsModel {
  public Algo: string | null = null;
  public Case: 'Best' | 'Worst' | 'Average' | null = null;
  public ValueOfN: string | null = null;

  constructor(data?: Partial<AlgoOptionsModel>) {
    Object.assign(this, data);
  }
}
