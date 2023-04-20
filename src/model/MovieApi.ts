import Movie from "@/model/Movie";

export default class MovieApi {
    private static readonly url = "http://localhost:5091/MovieApi"

    private static readJsonList(jsonData: any): any[] {
        const list: Movie[] = [];
        for (let jsonDataKey in jsonData) {
            list.push(new Movie(jsonData[jsonDataKey]["name"], jsonData[jsonDataKey]["id"]))
        }
        return list;
    }

    public static async ApiGet(): Promise<Movie[]> { //todo is this o to do so?
        const response = await fetch(this.url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const jsonData = await response.json(); //ask -> how to properly read JsonData in Js
        return this.readJsonList(jsonData);
    }

    public static async ApiPost(name: string) { //todo append this to list directly so you dont have to get again
        const response = await fetch(this.url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: name
            })
        });
        if (response.ok) {
            console.log("Posted: " + name)
        }
    }

    public static async ApiGetByName(name: string): Promise<Movie[]> { // todo return empty list if 404
        const response = await fetch(this.url + "/name/" + name, {
            method: "get",
            headers: {
                "Content-Type": "application/json",
            }
        });
        if (response.ok) {
            const jsonData = await response.json();
            return this.readJsonList(jsonData);
        } else {
            return [];
        }
    }


    public static async ApiGetById(id: number) {
        console.log("ID:" + id)
        const response = await fetch(this.url + "/id/" + id.toString(), {
            method: "get",
            headers: {
                "Content-Type": "application/json",
            }
        });
        // ask -> JSON.parse(); nicht nötig?
        const movieData = await response.json();
        console.log("Returning Movie " + id)
        return new Movie(movieData["name"], movieData["id"]);
    }

    public static async ApiDeleteById(id: number) {
        console.log(id);
        const response = await fetch(this.url + "/id/" + id, {
            method: "delete",
            headers: {
                "Content-Type": "application/json",
            }
        });
        console.log("response: " + response.status)
        if (response.ok) {
            console.log("204 is okayge")
        } else {
            console.log("204 is not okayge")
        }
    }

    // async function sendEmail(dataURL: string) {
    //     if (!emailIsValid(email.value) && email.value != "") {
    //         return false;
    //     } else {
    //         if (email.value != "") {
    //             emailList.push(email.value);
    //         }
    //         console.log("LOG: Started Post!")
    //         console.log("LOG: " + emailList)
    //         const response = await fetch(staticData.url + "/EmailApi/SendEmailWithData",
    //             {
    //                 method: "POST",
    //                 headers: {
    //                     "Content-Type": "application/json",
    //                 },
    //                 body: JSON.stringify({
    //                     mails: emailList,
    //                     username: username,
    //                     acesTest: acesTest,
    //                     imageData: dataURL,
    //                     // completionDate: completionDate.getTime(),
    //                 })
    //             });
    //         if (response.ok) {
    //             showModal.value = true;
    //         } else {
    //             //todo -> show modal with error message
    //         }
    //
    //         return true;

    //     }
    // }
}