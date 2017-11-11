using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class UIScript : MonoBehaviour {

	public sprite noKey, haveKey;
	private Image currentImage;

	// Use this for initialization
	void Start () {
		currentImage = GetComponent<Image>();
		currentImage.sprite = noKey;
	}
	
	public void ObtainKey(){
		currentImage.sprite = haveKey;
	}
}
