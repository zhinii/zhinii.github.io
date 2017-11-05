using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class dropMe : MonoBehaviour {


		public GameObject item; //ibjecr we want to grab
	public Transform drop; //where the object will go when dropped.

	bool playerInTrigger; ///this is used to indicate player is in 'hit zone'

//this detect if player 1 is in 'hit area' to pick up object
	void OnTriggerEnter (Collider col)
	{
		if(col.gameObject.name == "player1")
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
	}
	}
}