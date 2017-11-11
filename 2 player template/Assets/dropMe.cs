using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class dropMe : MonoBehaviour {


		public GameObject item; //object we want to grab
	public Transform drop; //where the object will go when dropped.
private GameController gameController;
	bool playerInTrigger; ///this is used to indicate player is in 'hit zone'


//used for scoring
 void Start () {
        GameObject gameControllerObject = GameObject.FindWithTag ("GameController");
        if (gameControllerObject != null) {
            gameController = gameControllerObject.GetComponent <GameController>();	}
        if (gameController == null) {
            Debug.Log ("Cannot find 'GameController' script");	}	}



//this detect if player 1 is in 'hit area' to pick up object
	void OnTriggerEnter (Collider col)
	{
		if(col.gameObject.name == "Sphere") //name of object we want to drop
	{
			Debug.Log("hit");

		playerInTrigger = true;
	
	}

}

//this says if player is in 'hit area' and they press the right key, they will pick up object
	void Update(){
		if(playerInTrigger && Input.GetKeyDown("return")){
           item.GetComponent<Rigidbody>().useGravity = true;
		item.GetComponent<Rigidbody>().isKinematic = false;
		item.transform.parent = null;
		item.transform.position = drop.transform.position;
		gameController.AddScore (1);// adds score after drop
		// UIScript ui = GameObject.Find("canvas/" + Image).GetComponent<UIScript>();
		// ui.ObtainKey();
	}
	}
}

