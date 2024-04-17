/* eslint-disable require-jsdoc */
export class CopyableObject {
  public copyWith(modifyObject: {[P in keyof this]?: this[P]}): this {
    return Object.assign(Object.create(this.constructor.prototype), {
      ...this,
      ...modifyObject,
    });
  }
}
