export default class FormStepValidation {
  private isValidExperiences: boolean;
  private isValidProfile: boolean;
  private isValidDescription: boolean;
  private isBudgeYes: boolean;
  private isBudgeNo: boolean;
  private isSelected: boolean;
  private isSelectedLocation: boolean;
  private isValidBasic: boolean;
  private isTerms: boolean;
  private isValidCheckBoxesDetailsProfession: boolean;
  private isValidBudgeAmount: boolean;

  constructor() {
    this.isValidExperiences = false;
    this.isValidProfile = false;
    this.isValidDescription = false;
    this.isBudgeYes = false;
    this.isBudgeNo = false;
    this.isSelected = false;
    this.isSelectedLocation = false;
    this.isValidBasic = false;
    this.isTerms = false;
    this.isValidCheckBoxesDetailsProfession = false;
    this.isValidBudgeAmount = false;
  }

  public isIsValidExperiences(): boolean {
    return this.isValidExperiences;
  }

  public setIsValidExperiences(isValidExperiences: boolean): void {
    this.isValidExperiences = isValidExperiences;
  }

  public isIsValidProfile(): boolean {
    return this.isValidProfile;
  }

  public setIsValidProfile(isValidProfile: boolean): void {
    this.isValidProfile = isValidProfile;
  }

  public isIsValidDescription(): boolean {
    return this.isValidDescription;
  }

  public setIsValidDescription(isValidDescription: boolean): void {
    this.isValidDescription = isValidDescription;
  }

  public isIsBudgeYes(): boolean {
    return this.isBudgeYes;
  }

  public setIsBudgeYes(isBudgeYes: boolean): void {
    this.isBudgeYes = isBudgeYes;
  }

  public isIsBudgeNo(): boolean {
    return this.isBudgeNo;
  }

  public setIsBudgeNo(isBudgeNo: boolean): void {
    this.isBudgeNo = isBudgeNo;
  }

  public isIsSelected(): boolean {
    return this.isSelected;
  }

  public setIsSelected(isSelected: boolean): void {
    this.isSelected = isSelected;
  }

  public isIsSelectedLocation(): boolean {
    return this.isSelectedLocation;
  }

  public setIsSelectedLocation(isSelectedLocation: boolean): void {
    this.isSelectedLocation = isSelectedLocation;
  }

  public isIsValidBasic(): boolean {
    return this.isValidBasic;
  }

  public setIsValidBasic(isValidBasic: boolean): void {
    this.isValidBasic = isValidBasic;
  }

  public isIsTerms(): boolean {
    return this.isTerms;
  }

  public setIsTerms(isTerms: boolean): void {
    this.isTerms = isTerms;
  }

  public isIsValidCheckBoxesDetailsProfession(): boolean {
    return this.isValidCheckBoxesDetailsProfession;
  }

  public setIsValidCheckBoxesDetailsProfession(isValidCheckBoxesDetailsProfession: boolean): void {
    this.isValidCheckBoxesDetailsProfession = isValidCheckBoxesDetailsProfession;
  }

  public isIsValidBudgeAmount(): boolean {
    return this.isValidBudgeAmount;
  }

  public setIsValidBudgeAmount(isValidBudgeAmount: boolean): void {
    this.isValidBudgeAmount = isValidBudgeAmount;
  }
}