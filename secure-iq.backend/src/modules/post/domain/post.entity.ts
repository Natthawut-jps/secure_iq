export class PostEntity {
  private constructor(
    public readonly id: string,
    public title: string,
    public content: string,
    public tag: string,
    public userId: string,
    public createdAt: Date,
    public updatedAt: Date,
  ) {}
  
  static create(props: {
      id: string;
      title: string;
      content: string;
      tag: string;
      userId: string;
      now: Date;
    }): PostEntity {
        const post = new PostEntity(
            props.id,
            props.title,
            props.content,
            props.tag,
            props.userId,
            props.now,
            props.now,
        );
        return post;
    }

     static reconstitute(props: {
        id: string;
        title: string;
        content: string;
        tag: string;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
      }): PostEntity {
        return new PostEntity(
          props.id,
          props.title,
          props.content,
          props.tag,
          props.userId,
          props.createdAt,
          props.updatedAt,
        );
      }

      updatePost(
          props: { title?: string; content?: string, tag?: string },
          now: Date,
        ): void {
      
          const changes: Record<string, unknown> = {};
          console.log('Updating post with props:', props);
          console.log('Current post title:', this.title);
          if (props.title) {
            if (props.title !== this.title) {
              this.title = props.title;
              changes.title = props.title;
            }
          }
      
          if (props.content) {
            if (props.content !== this.content) {
              this.content = props.content;
              changes.content = props.content;
            }
          }

          if (props.tag) {
            if (props.tag !== this.tag) {
              this.tag = props.tag;
              changes.tag = props.tag;
            }
          }
      
          if (Object.keys(changes).length === 0) return;
    
          this.updatedAt = now;
      }

       // ── Getters ──────────────────────────────────────────────────────
        get  _title(): string {
          return this.title;
        }

        get _updatedAt(): Date {
          return this.updatedAt;
        }

        get _content(): string {
          return this.content;
        }

        get _tag(): string {
          return this.tag;
        }

        get _userId(): string {
          return this.userId;
        }
}
    