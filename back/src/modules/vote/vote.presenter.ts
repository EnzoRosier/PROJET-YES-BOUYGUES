export class WorksitePresenter {
  id: string;
  numQuestion: string;
  reponse: string;
  commentaire: string;
  date: Date;
  worksite: {
    id: string;
    nom: string;
  };

  private constructor(data: WorksitePresenter) {
    Object.assign(this, data);
  }

  public static from(data: WorksitePresenter) {
    return new WorksitePresenter({
      id: data.id,
      numQuestion: data.numQuestion,
      reponse: data.reponse,
      commentaire: data.commentaire,
      date: data.date,
      worksite: data.worksite,
    });
  }
}
