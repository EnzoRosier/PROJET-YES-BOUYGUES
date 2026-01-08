export class WorksitePresenter {
  id: string;
  numQuestion: string;
  reponse: string;
  commentaire: string;
  reponseCommentaire: string;
  date: Date;
  dateCloture: Date;
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
      reponseCommentaire: data.reponseCommentaire,
      date: data.date,
      dateCloture: data.dateCloture,
      worksite: data.worksite,
    });
  }
}
