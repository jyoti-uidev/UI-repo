 inter.comp.ts
 private loadSurfaces(): Observable<any> {
        return Observable.create(observer => {
            //this.dataLoadingService.getSurfaceFillProperties()
            let source = Observable.forkJoin(this.dataLoadingService.getAllSurfaces());
            observer.next(source);
            this.surfacesSubscription = source.subscribe(response => {
                console.log(response, 'surfaces');
                let surfaces = response;

                this._surfaceFillProperties = [
                    {
                        "Visible": true,
                        "ColorHex": "#FF0000",
                        "Id": "10",
                        "FillMode": FillMode.Baseline,
                        "Transparency": 10,
                        "Pattern": 1
                    },
                    {
                        "Visible": true,
                        "ColorHex": "#800000",
                        "Id": "10",
                        "FillMode": FillMode.Baseline,
                        "Transparency": 20,
                        "Pattern": 1

                    }
                ];
                surfaces[0].forEach((surface, index) => {
                    this._surfaceFillProperties[index].Id = surface.Id;
                    console.log("add surface", surface);

                    this.addSurface(surface, surface.DisplayProperties);
                });
                console.log("loaded all surfaces...");
            },
                error => {
                    console.error('error loading surfaces');
                    observer.complete();
                },
                () => {
                    observer.complete();
                });
        });
    }
    
    data-loading-service.ts
      getSurfaceFillProperties(): Observable<any> {
        return this.http.get(`${this.apiBaseURL}/SurfaceFillProperties?projectId=${this.projectId}`, this.options)
            .map(this.extractData)
            .catch(this.handleError);
    }
