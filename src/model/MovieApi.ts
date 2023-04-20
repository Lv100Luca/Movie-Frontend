import Movie from "@/model/Movie";

export default class MovieApi {
    private static readonly url = "http://localhost:5091/MovieApi"

    public static async ApiGet(): Promise<Movie[]> { //todo is this o to do so?
        const response = await fetch(this.url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const jsonData = await response.json();
        const listOfMovies: Movie[] = [];
        for (let jsonDataKey in jsonData) {
            listOfMovies.push(new Movie(jsonData[jsonDataKey]["name"], jsonData[jsonDataKey]["id"]))
        }
        return listOfMovies;
    }

    public static async ApiPost(name: string) {
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

    public static async ApiGetByName(name: string): Promise<Movie[]> {
        const response = await fetch(this.url + "/name/" + name, {
            method: "get",
            headers: {
                "Content-Type": "application/json",
            }
        });
        const jsonData = await response.json();
        console.log(jsonData);
        const listOfMovies: Movie[] = [];
        for (let jsonDataKey in jsonData) {
            listOfMovies.push(new Movie(jsonData[jsonDataKey]["name"], jsonData[jsonDataKey]["id"]))
        }
        return listOfMovies;
    }


    public static async ApiGetById(id: number) {
        const response = await fetch(this.url)

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